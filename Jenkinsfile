pipeline {
	agent { label 'angular-docker-agent' }
	options { timeout (time: 20) }
	stages {
		stage('install') {
			steps {
				sh 'npm clean-install'
			}
		}
		stage('Compile') {
			steps {
				sh 'ng build --prod'
			}
		}
	}
}
