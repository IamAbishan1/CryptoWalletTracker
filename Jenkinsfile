pipeline {
    agent any

    triggers {
        githubPush(branchFilter: 'master') // Trigger the pipeline on pushes to the 'master' branch
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
