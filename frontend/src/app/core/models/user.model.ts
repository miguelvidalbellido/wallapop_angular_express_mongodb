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

export interface UserProfile {
    username:  string,
    email: string,
    profileImage: string,
    countPublishedProducts: number,
    count_followers:  number,
    count_likes: number
}

export interface ProfileStats {
    countPublishedProducts: Number,
    count_followers: Number,
    count_likes: Number
}