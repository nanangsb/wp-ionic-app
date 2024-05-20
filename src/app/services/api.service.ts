import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private domains: string[] = [];
	private activeDomain: string;
	private namespace: string;
	private isHttps: boolean;

	private defaultHeaders: { [name: string]: string } = {};

	constructor(private http: HttpClient, private translate: TranslateService) {
		// Default domains
		this.domains = ['muslim.or.id', 'rumaysho.com', 'almanhaj.or.id'];
		this.activeDomain = this.domains[0]; // Set default active domain

		// The path of endpoints
		this.namespace = 'wp-json';

		// HTTPS support
		this.isHttps = true;
	}

	// Method to construct the URL based on the active domain and other properties
	private constructUrl(): string {
		return (this.isHttps ? 'https://' : 'http://') + this.activeDomain + '/' + this.namespace;
	}

	// Method to change the active domain
	setActiveDomain(domain: string) {
		if (this.domains.includes(domain)) {
			this.activeDomain = domain;
		} else {
			throw new Error(`Domain ${domain} is not in the list of available domains.`);
		}
	}

	get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
		let defaultReqOpts = {
			params: { 'lang': this.translate.currentLang },
			responseType: 'json'
		};
		if (!reqOpts) {
			reqOpts = defaultReqOpts;
		} else {
			if ('params' in reqOpts) {
				delete reqOpts.params;
			}
			reqOpts = {
				...defaultReqOpts,
				...reqOpts
			}
		}

		if (params) {
			Object.assign(reqOpts.params, params);
		}

		return this.http.get(this.constructUrl() + '/' + endpoint, this.getRequestOptions(reqOpts));
	}

	post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
		return this.http.post(this.constructUrl() + '/' + endpoint, body, this.getRequestOptions(reqOpts));
	}

	put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
		return this.http.put(this.constructUrl() + '/' + endpoint, body, this.getRequestOptions(reqOpts));
	}

	delete(endpoint: string, reqOpts?: any): Observable<any> {
		return this.http.delete(this.constructUrl() + '/' + endpoint, this.getRequestOptions(reqOpts));
	}

	patch(endpoint: string, body: any, reqOpts?: any) {
		return this.http.patch(this.constructUrl() + '/' + endpoint, body, this.getRequestOptions(reqOpts));
	}

	private getRequestOptions(reqOpts) {
		let headers = this.defaultHeaders;

		if (!reqOpts) {
			return { headers }
		}
		if ('headers' in reqOpts) {
			headers = {
				headers: this.defaultHeaders,
				...reqOpts.headers
			}
			delete reqOpts.headers;
		}

		return {
			headers,
			...reqOpts
		}
	}

	setHeader(header: { [name: string]: string }) {
		return Object.assign(this.defaultHeaders, header);
	}

	unsetHeader(key: string) {
		delete this.defaultHeaders[key];
	}
}
