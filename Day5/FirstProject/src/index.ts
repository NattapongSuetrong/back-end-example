import { profile } from "console"
import { AppDataSource } from "./data-source"
import { Dog } from "./entity/Dog"
import { Profile } from "./entity/Profile"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"

AppDataSource.initialize().then(async () => {

    const dogRepository = AppDataSource.getRepository(Dog)   //ที่เก็บตาราง Dog
    const userRepository = AppDataSource.getRepository(User)
    const profileRepository = AppDataSource.getRepository(Profile)
    const photoRepository = AppDataSource.getRepository(Photo)

    const user = await userRepository.findOne({ 
        relations: ['photos', 'profile'], 
        where: { id: 1 } 
    })
    console.log(JSON.stringify(user, null, 2))


    // const photo1 = new Photo()
    // photo1.url = "url1"
    // photo1.user = user

    // const photo2 = new Photo()
    // photo2.url = "url2"
    // photo2.user = user

    // await photoRepository.save(photo1)
    // await photoRepository.save(photo2)

    // const user = new User()
    // user.firstName = 'Nattapong'
    // user.lastName = 'Suetrong'
    // user.age = 20
    // user.profile = new Profile()
    // user.profile.gender = 'male'
    // user.profile.photo = 'myimg.png'
    // await profileRepository.save(user.profile)
    // await userRepository.save(user)

    // const blackDog = new Dog()
    // blackDog.Name = 'Black Dog'
    // blackDog.Color = 'black'
    // const savedDog = await dogRepository.save(blackDog)
    // console.log('Saved Dog ' + savedDog.id)
    // console.log('Black Dog ' + blackDog.id)

    // const dogs = await dogRepository.find()
    // console.log(JSON.stringify(dogs, null, 2))

    // const dog = await dogRepository.findOneBy({ id: 2 })
    // console.log(JSON.stringify(dog, null, 2))

    // const dog2 = await dogRepository.find({where: { id: 2 } })
    // console.log(JSON.stringify(dog2, null, 2))

    // const dog3 = await dogRepository.findOne({where: { id: 2 } })
    // console.log(JSON.stringify(dog3, null, 2))

    // const dog4 = await dogRepository.findBy({ id: 2 })
    // console.log(JSON.stringify(dog4, null, 2))

    // dog3.Name = 'White Dog'
    // dog3.Color = "White"
    // await dogRepository.delete(dog3)

}).catch(error => console.log(error))
