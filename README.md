# Skayak

A podcast app based on skynet

# Description

Skayak is an attempt at building a live podcast app based on skynet and other protocols like ipfs(orbit-db).Here skynet provides the persistance layer and orbit-db provides the communication tools.This has allowed for a  decentralized approach for user data with only the following centralized metadata points:

- Time Server for syncing nodes
- Signalling server for webrtc comunications

## Usage

The app allows users to view / listen to the currenlty running live casts and/or cast their own stream.


The current implementation can be accessed [here](https://siasky.net/_AEYj-HAFVk1s2QZB48ejHOSsZ_5E-hArKK1RdV-KtC7iw/index.html)


### What works now
- Basic node communication(channel join/leave)

### WIP
- Userdata encryption
- Node sync implementation needs a fair bit of work. Syncing could time and nodes could frequently disconnect.

## License
[MIT](https://choosealicense.com/licenses/mit/)