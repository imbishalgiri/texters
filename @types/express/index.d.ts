import { typeUser } from '../../backend/types/index'
declare global {
   namespace Express {
      interface User extends typeUser {}
      interface Request {
         user?: User
      }
   }
}

export {}
