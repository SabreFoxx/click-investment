pipeline {
	agent { label 'angular-docker-label' }
	options { timeout (time: 30) }
	stages {
		stage('install') {
			steps {
				sh 'npm clean-install'
			}
		}
		stage('compile') {
			steps {
				sh 'ng build'
			}
		}
		stage('upload to S3 bucket') {
              steps {
                  withAWS(region:'eu-west-3',credentials:'deployment-user') {
                  sh 'echo "uploading dist to S3 bucket"'
                      s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file:'dist/click-investment', bucket:'click-investment')
                  }
              }
         }
	}
}
