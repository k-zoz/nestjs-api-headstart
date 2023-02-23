//have a dedicated database for testing
//basically takes everything in the app module, and can make requests and expect response from it.

import { ValidationPipe } from "@nestjs/common"
import { INestApplication } from "@nestjs/common/interfaces"
import { Test } from "@nestjs/testing"
import * as pactum from 'pactum'
import { PrismaService } from "../src/prisma/prisma.service"
import { AppModule } from "../src/app.module"
import { AuthDto, AuthLoginDto } from "src/auth/dto"
import { EditUserDto } from "src/users/dto"



describe(`App e2e`, () => {
  let app: INestApplication //type nest applicsation
  let prisma: PrismaService //type of prisma service
  //before all means before anything tests start
  beforeAll(async () => {
    // module ref is basically takes everything in the app module, and can make requests and expect response from it.
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true // setting whitelist to true strips out the unwanted information passed through to the dto
    }))
    await app.init() // initialize the app
    await app.listen(4444) // create a server/ api to serve requests and response which pactum will need
    prisma = app.get(PrismaService) // getting the prisma provider, can also get  any provider
    await prisma.cleanDb() // call the clean database logic before anything is carried out
    pactum.request.setBaseUrl(`http://localhost:3333`) //sets the base url
  })

  afterAll(() => {
    app.close()
  })



  //nested describes to tell it what it needs to do
  describe('Auth', () => {
    //==========Sign Up Testing =========================//
    describe(`SignUp`, () => {
      const dto: AuthDto = {
        email: `4@gmail.com`,
        password: `secret`,
        staffIdNumber: `Ab-MFB/2325`
      }
      //do not sign up if email is empty, rather throw error. To know if email is empty test provides password only.
      it(`it should throw error if email empty`, () => {
        return pactum.spec().post(`/auth/signup`).withBody({ password: dto.password }).expectStatus(400)
      })
      //do not sign up if password is empty, rather throw error. To know if password is empty test provides email only.
      it(`it should throw error if password empty`, () => {
        return pactum.spec().post(`/auth/signup`).withBody({ email: dto.email }).expectStatus(400)
      })
      //do not sign up if staffIdNumber is empty, rather throw error. To know if staffIdNumber is empty test provides email & password only.
      it(`it should throw error if staffIDNumber empty`, () => {
        return pactum.spec().post(`/auth/signup`).withBody({ email: dto.email, password: dto.password }).expectStatus(400)
      })
      //do not sign up if body is empty, rather throw error.
      it(`it should throw error if body is empty`, () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400)
      })
      //sign up if no exceptions or errors
      it(`should signup`, () => {
        return pactum.spec().post(`/auth/signup`).withBody(dto).expectStatus(201)
      })
    })
    //==========Sign In Testing==================//
    describe(`SignIn`, () => {
      const dto: AuthLoginDto = {
        email: `4@gmail.com`,
        password: `secret`
      }
      //do not sign in if email is empty, rather throw error. To know if email is empty test provides password only.
      it(`it should throw error or exception if email is empty`, () => {
        return pactum.spec().post(`/auth/login`).withBody({ password: dto.password }).expectStatus(400)
      })
      //do not sign in if password is empty, rather throw error. To know if password is empty test provides email only.
      it(`it should throw error or exception if password is empty`, () => {
        return pactum.spec().post(`/auth/login`).withBody({ email: dto.email }).expectStatus(400)
      })
      //do not sign in if body empty, rather throw error.
      it(`it should throw error or exception if body is empty`, () => {
        return pactum.spec().post(`/auth/login`).expectStatus(400)
      })
      //it should sign in if no exceptions or errors
      it(`should login`, () => {
        return pactum.spec().post(`/auth/login`).withBody(dto).expectStatus(200).stores(`userAt`, `access_token`)
      })

    })
  })

  describe('User', () => {

    describe(`Get User`, () => {
      it(`Should get current user`, () => {
        return pactum.spec().get(`/users/me`).withHeaders({
          Authorization: `Bearer $S{userAt}`
        }).expectStatus(200)
      })
    })
    describe(`Edit User`, () => {
      const dto: EditUserDto = {
        email: `5@gmail.com`,
        staffIdNumber: `Ab-Mfb/2000`
      }
      //========//
      it(`should be able to edit details of current user by id`, () => {
        return pactum.spec().patch('/users').withHeaders({
          Authorization: `Bearer $S{userAt}`
        }).withBody(dto).expectStatus(200)
      })
    })

  })
  describe('Story', () => {
    describe(`Create Story`, () => { })
    describe(`Get Stories`, () => { })
    describe(`Get Story by ID`, () => { })
    describe(`Edit Story by ID`, () => { })
    describe(`Delete Story by ID`, () => { })
  })

})