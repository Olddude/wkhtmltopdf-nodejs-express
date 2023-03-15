import passport from 'passport';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

async function createAuthMiddleware() {
  const anonymousStrategy = new AnonymousStrategy();
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user as any);
  });

  passport.use('anonymous', anonymousStrategy);
  
  return passport;
}

export { createAuthMiddleware };
