

export const EnvConfiguration = () => {

    return{
        environment: process.env.NODE_ENV || 'development',
        mongodb: process.env.MONGODB,
        port: process.env.PORT || 3002,
        defaultLimit: process.env.DEFAULT_LIMIT ? +process.env.DEFAULT_LIMIT : 10
    }

}