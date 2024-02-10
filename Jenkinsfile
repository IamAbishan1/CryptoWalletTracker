pipeline {
    agent any

    triggers {
        githubPush(branchFilter: 'master') // Trigger the pipeline on pushes to the 'master' branch
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         // Checkout the source code from your Git repository
        //         git credentialsId: 'your_git_credentials_id', url: 'https://github.com/your-username/your-repository.git'
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                // Install dependencies if required
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build your application (replace with your build command)
                sh 'npm start'
            }
        }

    }
}
