import NextAuth, { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'


async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('refreshedToken IS', refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in *  1000, // 1 hour as 3600 returns from API from spotify api
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken

    }
  } catch (error) {
    console.log('error', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
 
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string, // spotify client id
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string, // spotify secret, all of them was obtained in developers spotify app.
      authorization: LOGIN_URL,

    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECREET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in 
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000   // handling expiry times in Milliseconds hence * 1000
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires!) {
        console.log('EXISTING TOKEN IS VALID');
        return token
      }

      console.log('EXISTING TOKEN HAS EXPIRED, REFRESHING');
      return await refreshAccessToken(token)
      // Acess token has expire, so we need to refresh it, need a new access token!
    },
    async session({session, token}) {
          //user can see 
          session.user.accessToken = token.accessToken
          session.user.refreshToken = token.refreshToken
          session.user.username = token.username
          return session
          }

    
  }

}
export default NextAuth(authOptions)