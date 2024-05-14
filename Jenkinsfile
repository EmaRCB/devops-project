pipeline {
    agent any
    
    environment {
        BRANCH_NAME_CLEANED = sh(script: 'echo \$GIT_BRANCH | sed \'s/origin\\///\'', returnStdout: true).trim()
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t Segunda-Entrega-\$BRANCH_NAME_CLEANED:1.0.0-\$BUILD_NUMBER ."
            }
        }
        stage('Stop Previous Containers') {
            steps {
                sh 'docker ps -q --filter "name=Segunda-Entrega-\$BRANCH_NAME_CLEANED" | xargs -r docker stop'
            }
        }
        stage('Remove Stopped Containers') {
            steps {
                sh 'docker ps -a -q --filter "name=Segunda-Entrega-\$BRANCH_NAME_CLEANED" | xargs -r docker rm'
            }
        }
        stage('Run Docker Container') {
            steps {
                sh 'docker run -d --network=host --name Segunda-Entrega-\$BRANCH_NAME_CLEANED-\$BUILD_NUMBER Segunda-Entrega-\$BRANCH_NAME_CLEANED:1.0.0-\$BUILD_NUMBER'
            }
        }
    }
}