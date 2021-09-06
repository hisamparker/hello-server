## About This Project

**Hello Tutorials** is a shop / tutorials app built with Next.js / React.js and Keystone.js / Express.js.

## Hello Tutorials - Front End Stuff

### Built With

- [Keystone.js](https://keystonejs.com/) (Headless CMS)
- [StripeMongoDB](https://www.mongodb.com/cloud/atlas)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TypeScript](https://www.typescriptlang.org/)

**Some features**:

- Users can sign up, log in, purchase tutorials, and then read the tutorials that they've purchased. They can, in theory also reset their password, but this is still in demo mode so is not an IRL thing. The server and admin GUI use Keystone. So there's a simple admin page. You'll also get access to GraphIQL via the API endpoint, <yoursite>/api/graphql which is really nice to explore.

## Have a loooook

Client: [https://www.hellotutorials.dev](https://www.hellotutorials.dev)
But, please don't buy things because I don't think that's at all legal | ◯ ‸ ◯ |

## Getting Started

To get a local copy up and running follow these steps for the back end, and the steps in the [README](https://github.com/hisamparker/hello-client.git) for the backend.

### Prerequisites

- A recent<i>ish</i> version of Node 
- A computer 
- A custom domain: For users to sign up, log in, view their purchased tutorials, we need authentication. The Keystone / GraphQL server for this project uses sessions for authentication (in the form of cookies and JWT tokens). 

In production, the cookies won't be passed unless the client (Next.js application) shares the same root domain as the server because of current browser restrictions / SameSite origins policies. 

For example, the server will be on api.example.com and the client will be on www.example.com.

The version of Keystone.js (Next) used by this project does not allow the developer to set SameSite=none ლ(ಥ Д ಥ )ლ 

The documentation for Keystone 6 implies that you can set SameSite=none with the current version of Keystone, but I'll believe it when I see it.

### Installation
#### You'll need to set up the front end as well, to do so, see the steps in the server [README](https://github.com/hisamparker/hello-client.git)

1. Clone the repo

   ```sh
   $ git clone https://github.com/hisamparker/hello-server.git
   ```

2. Install NPM packages :  You will get a lot of warnings, these packages are old. I would not build anything based on this stack moving forward. Everything here has been outdate since like, August 2021 ⊂(▀¯▀⊂)

   ```sh
   $ npm i
   ```
3. Create configuration file for the frontend (`.env`), see [`sample.env`](/sample.env). Notice, you need to set up a bunch of stuff, like cloudinary and mongodb Atlas, then add keys for that stuff.

4. Change the keystone.ts file to match your own front end info, like local host etc...

## Usage

```sh
$ npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) for the admin GUI. To see the GraphIQL playground, visit [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

## Deployment

I deployed to DigitalOcean. I kind of hate it because I find the documentation very all over the place, but the customer service is pretty ok. YOU CAN NOT DEPLOY TO HEROKU. There's a bug in this version of keystone/auth so Heroku can't read headers properly. So, Render is another option. 

Remember to add your environmental variables. You can also do this in a YAML config file.

I used the do App platform, so the following applies to that. To avoid CORS issues, after you deploy, make some changes to the YAML file (it's in App settings at the bottom of the page).

Add:
 cors:
    allow_credentials: true
    allow_headers: ["content-type"]
    allow_origins:
    - prefix: https://www.yoursite.whatever 

ᕙ⁞ = 〰 = ⁞ᕗ

Remember to update the keystone.ts file with your correct endpoint (URL) if you've hard coded it, otherwise it should be in your environmental variables and totally fine. Let do access your Githup repo and poof, app. But...

You won't be able to log in, sign up, etc... without a custom domain and that part is a pain in the tits.

My custom domain is a Google domain. You must set up the correct [resource records] (https://support.google.com/domains/answer/3251147?hl=en) for your domain. In do, follow the steps to add a custom domain laid out in their docs (this type of stuff changes all the time, so I'm not going to give exact steps, you can always email me for help!) You'll need a  0 issue "letsencrypt.org" cert and a 0 issue "digicert.com" (backend)  

## Playlist

I like music when coding - [hello client playlist](https://open.spotify.com/playlist/6COOwTUqfykZ1jjbPzyDQE?si=97aa3c684def49ff)

## Acknowledgements

- Martin Toledo ╰(✿˙ᗜ˙)੭━☆ﾟ.*･｡ﾟ I could not have figured out my toml and yaml without your help and also you are the best and so fun and so cool
- Leif Parker (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ I could not have figured out custom domain things without your super annoying help you are myy best friend ever and also v annoying and also v cool
- Yong Lee (✿ ◕ᗜ◕)━♫.*･｡ﾟ Who also helped me figure out deployment and that I needed a digicert, which I really really did and who I don't actually know ver well, but seems very kind and thoughtful