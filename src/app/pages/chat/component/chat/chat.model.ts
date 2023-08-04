import { SendMessage } from "../../model/chat.model";

export interface ChatUser {
    image?: string;
    name: string;
    message: string;
    time: string;
    color: string;
}

export interface ChatMessage {
    align?: string;
    data: SendMessage[]
}
