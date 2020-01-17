export default 
`type User{
    id:ID
    names:String
    nickname:String
    password:String
    photo:String
}
input UserInput{
    id:ID
    names:String
    nickname:String
    password:String
    photo:String
}
input LoginInput{
    nickname: String
    password:String
}
""" mutations """
type  Mutation {
    SignUp(input: UserInput) :User,
    UpdateUser(input: UserInput) :User,
    Login(input: LoginInput) :User
}
type Query{
    getUsers:[User],
}`