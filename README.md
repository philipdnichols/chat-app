# chat-app
Simple WebSocket-based chat app. Mostly just for getting used to yeoman and the angular-fullstack generator.

## Requirements Scratchpad

* Users will be presented with a list of chat rooms
* Users can join any chat room
* Chat rooms will announce users when they join a chat room
* Chat rooms will announce when a user leaves the chat room
* Chat rooms will show a list of the users who are in the chat room

### Models

#### ChatRoom

* Users can create new chat rooms
* Each chat room will keep track of who is currently joined (Roster)

#### ChatMessage

* Attributes
 * Text
 * Author
 * User FK
 * Time
 * ChatRoom FK
