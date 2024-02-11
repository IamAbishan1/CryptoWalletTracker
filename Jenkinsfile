pipeline {
    agent any

    triggers {
        githubPush(branchFilter: 'master') // Trigger the pipeline on pushes to the 'master' branch
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'cd app_build && npm install'
            }
        }

        stage('Build') {
            steps {
                // Build application 
                sh 'cd app_build && npm start'
            }
        }

    }
}
