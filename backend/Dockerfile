FROM maven:latest

WORKDIR /app

COPY . ./

RUN mvn clean && mvn install -DskipTests

COPY target/*.jar ./app.jar

EXPOSE 8080

CMD ["java", "-jar" , "app.jar"]