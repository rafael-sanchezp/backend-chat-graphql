export default 
`type Message{
    id:ID
    text:String
    user:ID
    owner:ID
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
    createMessage(input: MessageInput):Response,
}
type Query{
    getMessage(input: MessageInput):[Message]
}`