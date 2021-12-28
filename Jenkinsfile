pipeline {
//def workspace;
agent any
// node {
   parameters {
    booleanParam(name: 'DEPLOYS', defaultValue: false, description: 'Use this build for deployment.')
   }
 tools {
      nodejs "Node"
   }
   triggers {
        //cron('H 20 * * *') //regular builds
        pollSCM('* * * * *') //polling for changes, here once a minute
        //bitbucketPush()
    }
environment {
   NAME = "finlevit-payload"
   //REPO = "harbor.tabner.us/finlevit"
   REPO = "10.10.5.17:443/finlevit"
   DNAME = "finlevit-payload"
}
  stages {
     stage('Checkout Source')
      {
         steps {
            checkout scm
         }
      }
     stage('Install dependencies'){
         steps {
          //sh 'npm config ls'
          echo"Let's remove the packge-lock.json to avoid any unnecessary issues"
          sh 'rm -rf package-lock.json'
          echo"now install the dependencies which will auto-generate new package-lock.json file"
          echo"this will be done in Build Docker Image Stage"
          //sh 'npm install'
          sh 'npm install typescript@3.5.3'
            //echo "Npm Packages has been installed"
         }
      }
      stage('Sonarqube Analysis') {
        environment {
        scannerHome = tool 'SonarQube'
         }
        steps {
         echo"Analysing the Code base in SonarQube"
         withSonarQubeEnv('sonar') {
         sh "${scannerHome}/bin/sonar-scanner"
        }
        sleep(30)
        timeout(time: 10, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
    }
}
      stage('Build Docker Image'){
         steps {
//		     echo "Running ${VERSION} on ${env.JENKINS_URL}"
            sh 'docker build --force-rm=true -t ${REPO}/${NAME}:r-${BUILD_NUMBER} .'
         }
      }
       stage('Docker Image Testing'){
         steps {
          echo"unit testing"
          sh'docker image inspect ${REPO}/${NAME}:r-${BUILD_NUMBER}'
          sh 'docker run --rm -p 3700:8081 --detach ${REPO}/${NAME}:r-${BUILD_NUMBER}'
          sleep(20)
          sh 'docker stop $(docker ps -a -q)'
         }
      }
      stage('Publish'){
         when {
    expression {
        return env.BRANCH_NAME == 'staging';
        }
    }
         steps {
            echo"Publishing the source files to remote registry"
            sh 'docker push ${REPO}/${NAME}:r-${BUILD_NUMBER}'
         }
      }
		stage('Deploy to Demo-Dev'){
			when {
			expression {
			return env.BRANCH_NAME == 'staging';
			}
			}
        steps{
            echo"Deploying the latest version"
			sh 'ssh root@10.10.5.41 "kubectl -n design set image deployments/${DNAME} ${NAME}=${REPO}/${NAME}:r-${BUILD_NUMBER}"'
            sh 'ssh root@10.10.5.41 "kubectl -n design rollout restart deployment ${DNAME}"'
            echo"Successfully deployed the latest version of the Application"
			}
		}

	}

   post {
      always {
            cleanWs()
        }
   }

}
