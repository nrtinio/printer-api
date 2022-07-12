declare namespace Express {
    export interface Request {
       userData?: {
           email: string,
           userId: string
        }
    }
 }