import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from 'src/app/models/wordpress';
import { NavController } from '@ionic/angular';
import Prism from 'prismjs';

@Component({
	selector: 'app-single',
	templateUrl: './single.page.html',
	styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit, AfterViewChecked {

	postId: number;
	post: Post;
	loading: boolean;
	postImage: any;

	constructor(
		private postService: PostService,
		private route: ActivatedRoute,
		private media: MediaService,
		private sanitizer: DomSanitizer,
		private navCtrl: NavController
	) {
	}

	ngOnInit() {
		this.loading = true;
		this.postId = +this.route.snapshot.paramMap.get('id');
		this.postService.getPost(this.postId).subscribe(post => {
			this.post = post;
			this.loading = false;
			if (this.post.featured_media) {
				this.postImage = this.sanitizer.
					bypassSecurityTrustStyle(`url('${this.media.getSourceUrl(this.post._embedded['wp:featuredmedia'][0], 'full')}')`);
			}
		});
	}

	ngAfterViewChecked(): void {
		Prism.highlightAll();
	}

	goBack() {
		this.navCtrl.pop();
	}

}
