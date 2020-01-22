export default 
`type Message{
    id:ID
    text:String
    user:User
    owner:User
    type:String
}
type Response{
    status:statusType
}
enum statusType{
    SUCCESS
    FAIL
}
input MessageInput{
    id:ID
    text:String
    user:ID
    owner:ID
    type:String
}
""" mutations """
type  Mutation {
    createMessage(input: MessageInput):Message,
}
type Subscription{
    Listen(input: MessageInput):Message
}
type Query{
    getMessage(input: MessageInput):[Message]
}`