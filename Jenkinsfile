pipeline {
    agent any
    
    environment {
        BRANCH_NAME_CLEANED = sh(script: 'echo $GIT_BRANCH | sed "s/origin\\///"', returnStdout: true).trim()
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                sh "docker build -t segunda-entrega-${BRANCH_NAME_CLEANED}:1.0.0-${BUILD_NUMBER} ."
            }
        }
        stage('Stop Previous Containers') {
            steps {
                sh "docker ps -q --filter 'name=segunda-entrega-${BRANCH_NAME_CLEANED}' | xargs -r docker stop"
            }
        }
        stage('Remove Stopped Containers') {
            steps {
                sh "docker ps -a -q --filter 'name=segunda-entrega-${BRANCH_NAME_CLEANED}' | xargs -r docker rm"
            }
        }
        stage('Call Deploy') {
            steps {
                build job: 'Deploy Back', wait: true, parameters: [
                    string(name: "BRANCH_NAME_CLEANED", value: "${BRANCH_NAME_CLEANED}"),
                    string(name: "BUILD_NUMBER", value: "${BUILD_NUMBER}")
                ]
            }
        }
    }
}
