import {ApolloServer,gql} from "apollo-server";

let Tweets = [
    {
        id : "1",
        text : "first one Tweet"
    },
    {
        id : "2",
        text : "second two Tweet"
    }
]
let Users = [
    {
        id : "1",
        firstName : "김",
        lastName : "용해"
    },
    {
        id : "2",
        firstName : "김",
        lastName : "태준"
    }
]
const typeDefs = gql`
    type User{
        id : ID!
        uid : String!
        firstName : String!
        lastName : String
        fullName : String!
    }
    type Tweet {
        id : ID!
        text : String!
        author : User!
    }
    type Query {
        UserAll : [User!]!
        allTweets:[Tweet!]!
        tweet(id : ID!) : Tweet
    }
    type Mutation{
        PostTweet(text : String!, userId : ID!) : Tweet!
        deleteTweet(Id : ID!) : Boolean!
    }
`;
const resolvers = {
    Query : {
        allTweets(){
            return Tweets;
        },
        tweet(root,{id}){
            return Tweets.find((tweet) => tweet.id === id);
        },
        UserAll(){
            console.log("Users All Called!!");
            return Users;
        }, 
        
    },
    Mutation : {
        PostTweet(root,{text,userId}){
            const NewTweet = {
                text,
                id : Tweets.length + 1
            }
            Tweets.push(NewTweet);
            return NewTweet;
        },
        deleteTweet(root,{Id}){
            const tweet = Tweets.find((tweet => tweet.id === Id));
            if(!tweet){
                return false;
            }
            else{
                Tweets = Tweets.filter((tweet) => tweet.id !== Id);
                return true;
            }
        }
    },
    User : {
        fullName({firstName,lastName}){
            console.log("fullName Called!");
            return `${firstName}${lastName}`;
        },
        uid({id}){
            return `${id}/${Date.now()}`;
        }
        
    }
}

const server = new ApolloServer({typeDefs,resolvers});
//SDL ==== 스키마 definition 랭기지 ㅇㅋ?

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
})