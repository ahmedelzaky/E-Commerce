FROM maven:latest

WORKDIR /app

COPY . ./

RUN mvn clean && mvn install -DskipTests

EXPOSE 8080

CMD ["java", "-jar" , "/root/.m2/repository/com/example/backend/0.0.1-SNAPSHOT/backend-0.0.1-SNAPSHOT.jar"]