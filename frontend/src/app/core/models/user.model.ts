export interface User{
    username: string,
    email: string,
    passwordHash: string,
    userBio: string,
    f_nac: Date,
    cp: number,
    profileImage: string,
    token: string
}