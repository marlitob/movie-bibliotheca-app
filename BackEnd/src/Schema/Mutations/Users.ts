import {GraphQLID, GraphQLList, GraphQLString} from 'graphql';
import {UserType} from "../TypeDefs/User";
import { Users } from "../../Entities/Users";


export  const CREATE_USER = {
    type: UserType,
    args:{
        // id: { type: GraphQLID},
        name: { type: GraphQLString},
        username: { type: GraphQLString},
        password: { type: GraphQLString}
    },
    async resolve(parent: any, args: any) {
        // const { name, username, password  } = args
       await Users.insert(args)
        return args;
    }
}
