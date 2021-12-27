export class UserProfileDto {
    readonly id: number
    readonly firstname: string
    readonly surname: string
    readonly dob: Date
    readonly avatarPath: string
    readonly accessLevel: number
    readonly joinedOn: Date
}