pipeline {
    agent any

    triggers {
        githubPush(branches: ['master']) // Trigger the pipeline on pushes to the 'master' branch
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build application 
                sh 'npm start'
            }
        }

    }
}
