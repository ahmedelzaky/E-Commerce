FROM maven:latest

WORKDIR /app

COPY . ./

RUN mvn clean && mvn install -DskipTests

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

CMD ["java", "-jar" , "app.jar"]