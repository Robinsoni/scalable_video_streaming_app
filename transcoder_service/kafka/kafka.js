import {Kafka} from "kafkajs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

class KafkaConfig {
   constructor(){
       this.kafka = new Kafka({
           clientId: process.env.KAFKA_CLIENT,
           brokers: [process.env.KAFKA_BROKER],
           ssl: {
               ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
           },
           sasl: {
               username: process.env.KAFKA_SASL_USER,
               password:  process.env.KAFKA_SASL_PWD,
               mechanism:  process.env.KAFKA_SASL_MECHANISM
           }
       })
       this.producer = this.kafka.producer()
       this.consumer = this.kafka.consumer({groupId: process.env.KAFKA_CONSUMER_GROUP})
   }

   async produce(topic, messages){
       try {
           const result = await this.producer.connect()
           console.log("kafka connected... : ", result)
           await this.producer.send({
               topic: topic,
               messages: messages
           })     
       } catch (error) {
           console.log(error)
       }finally{
           await this.producer.disconnect()
       }  }

   async consume(topic , callback){
       try {
           await this.consumer.connect()
           await this.consumer.subscribe({topic: topic, fromBeginning: true})
           await this.consumer.run({
               eachMessage: async({
                   topic, partition,message
               }) =>{
                   const value = message.value.toString()
                   callback(value)
               }
           })
       } catch (error) {
           console.log(error)
       }
   }
}
export default KafkaConfig;
 