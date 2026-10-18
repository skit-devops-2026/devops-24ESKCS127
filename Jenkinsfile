pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'devops-24eskcs127'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'make install'
            }
        }

        stage('Test Suite') {
            steps {
                echo 'Running automated unit test suite...'
                sh 'make test'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Compiling frontend Vite distribution...'
                sh 'make build'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building container image...'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
            cleanWs()
        }
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Pipeline failed! Check the console logs for debugging.'
        }
    }
}
