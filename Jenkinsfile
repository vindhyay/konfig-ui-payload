pipeline {
//def workspace;
agent {
   label "kubeagent"
} 
// node {
   parameters {
    booleanParam(name: 'DEPLOYS', defaultValue: false, description: 'Use this build for deployment.')
   }
 tools {
      nodejs "Node"
   }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true)
    }
environment {
   NAME = "finlevit-payload"
   REPO = "harbor.tabner.com:443/konfig"
   //REPO = "10.10.5.17:443/finlevit"
   DNAME = "finlevit-payload"
   LOC = "dev"
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }
        stage('Clone konfig-app-release') {
            steps {
                dir('konfig-app-release') {
                    git(
                        url: 'http://gitlab.tabner.com/fin/konfig-app-release.git',
                        branch: 'dev',
                        credentialsId: 'jenkinsgitlab'
                    )
                }
            }
        }

    
        stage('Clone Helm Repository') {
            steps {
                dir('konfig-helm-resources') {
                    git(
                        url: 'http://gitlab.tabner.com/fin/konfig-helm-resources.git',
                        branch: 'develop',
                        credentialsId: 'jenkinsgitlab'
                    )
                }
            }
        }

        stage('Reading Values from Changelog and Service Versions') {
            steps {
                script {
                    def json = readJSON file: 'konfig-app-release/config.json'
                    env.service_version = json[NAME].toInteger().plus(1).toString()
                }
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
          sh 'npm install'
          sh 'npm run build'
            //echo "Npm Packages has been installed"
         }
      }
//       stage('Sonarqube Analysis') {
//         environment {
//         scannerHome = tool 'SonarQube'
//          }
//         steps {
//          echo"Analysing the Code base in SonarQube"
//          withSonarQubeEnv('sonar') {
//          sh "${scannerHome}/bin/sonar-scanner"
//         }
//         sleep(30)
//         timeout(time: 10, unit: 'MINUTES') {
//             waitForQualityGate abortPipeline: true
//         }
//     }
// }
         stage('Building Docker Image') {
            steps {
                sh "docker build -t ${REPO}/${NAME} ."
                sh "docker tag ${REPO}/${NAME}:latest ${REPO}/${NAME}:${env.service_version}"
            }
        }

        stage('Docker Image Testing') {
            steps {
                sh "docker image inspect ${REPO}/${NAME}:${env.service_version}"
            }
        }

        stage('Push to Harbor Artifactory') {
            steps {
                echo "Pushing the Docker Image to Remote Registry(Harbor)"
                sh "docker login -u $HARBOR_USER -p $HARBOR_PASSWORD harbor.tabner.com:443"
            	sh "docker push ${REPO}/${NAME}:${env.service_version}"
            }
        }

        stage('Deploy to Dev') {
            when {
                expression {
                    return env.BRANCH_NAME == 'dev';
                }
            }
            steps {
                echo "Deploying the latest version"
				script {
                    def release_name = env.NAME
                    def chartVersion = '0.1.0'
                    def serviceVersion= env.service_version
                    echo"Deploying the ${serviceVersion} version of ${release_name} in ${LOC}"
                    sh """
                    export KUBECONFIG='/home/jenkins/agent/kubeconfig/kubeconfig-${LOC}.yaml'
                    chmod 600 /home/jenkins/agent/kubeconfig/kubeconfig-${LOC}.yaml
                    cd konfig-helm-resources/helm-charts/${release_name}
                    helm package .
                    if helm list -n ${LOC} | grep -E '(^|[[:space:]])${release_name}([[:space:]]|\$)'; then
                    helm upgrade ${release_name} ${release_name}-${chartVersion}.tgz --set namespace=${LOC},image.version=${serviceVersion},domain=${LOC}.konfig.io,env=${LOC} -n ${LOC}
                    else
                    helm install ${release_name} ${release_name}-${chartVersion}.tgz --set namespace=${LOC},image.version=${serviceVersion},domain=${LOC}.konfig.io,env=${LOC} -n ${LOC}
                    fi
                    """
                    echo"Successfully deployed the ${serviceVersion} version of the Application ${release_name} in ${LOC}"
            	}
            }
        }

        stage('Push changes in the config.json to the dev branch of konfig-app-release') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkins-fin-gitlab-token', variable: 'GITLAB_TOKEN')]) {
                        dir('konfig-app-release') {
                            sh """
                                git config --global user.email "admin@finlevit.com"
                                git config --global user.name "jenkins-fin"
                                git pull http://oauth2:${GITLAB_TOKEN}@gitlab.tabner.com/fin/konfig-app-release.git dev
                            """
                            def json = readJSON file: 'config.json'
                            json[NAME] = json[NAME].toInteger().plus(1).toString()
                            writeFile file: 'config.json', text: groovy.json.JsonOutput.prettyPrint(groovy.json.JsonOutput.toJson(json))
                            sh """
                                git add config.json
                                git commit -m "Upgraded ${NAME} version"
                                git push http://oauth2:${GITLAB_TOKEN}@gitlab.tabner.com/fin/konfig-app-release.git dev
                            """
                        }
                    }
                }
            }
        }
	}

   post {
      always {
            cleanWs()
        }
   }

}
