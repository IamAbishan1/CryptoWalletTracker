pipeline {
    agent any

    //triggers {
      //  githubPush(branches: ['master']) // Trigger the pipeline on pushes to the 'master' branch
//    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install dependencies
		sh 'pwd'
		sh 'ls -ltr'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build application source 
		sh '/var/lib/jenkins/.nvm/nvm.sh'
                sh 'npm run build'
                sh 'npm start'
            }
        }

    }
}
