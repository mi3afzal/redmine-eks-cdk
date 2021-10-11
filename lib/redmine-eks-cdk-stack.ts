import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';

export class RedmineEksCdkStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);


		// The code that defines your stack goes here
		const cluster = new eks.Cluster(this, 'redmine-cluster', {
			clusterName: `redmine`,
			version: eks.KubernetesVersion.V1_18,
			defaultCapacity: 1 // see more detail in the bottom
		});

		cluster.addHelmChart("redmine", {
			repository: "https://charts.bitnami.com/bitnami",
			chart: "redmine",
			release: "redmine-demo",
			namespace: "redmine",
			values: {
				redmineUsername: "Irfan",
				redminePassword: "Irfan@RM777",
				redmineEmail: "mi3afzal@gmail.com",
			},
		});

		/*
		To increase defaultCapacity, we have to manage NFS manually

		Redmine writes uploaded files to a persistent volume. By default that volume cannot be shared between pods (RWO). In such a configuration the replicas option must be set to 1. If the persistent volume supports more than one writer (RWX), ie NFS, replicas can be greater than 1.

		Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube. The volume is created using dynamic volume provisioning. Clusters configured with NFS mounts require manually managed volumes and claims.
	    
	    
		*/


	}
}