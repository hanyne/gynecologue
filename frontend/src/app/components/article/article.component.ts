import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article';
import { ArticleService } from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  
  newArticle: any = {};
  errorMessages: string[] = [];
 

  constructor( private articleService: ArticleService, private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addArticle() {
    
    this.errorMessages = [];
  

    if (!this.newArticle?.title || !this.newArticle?.description|| !this.newArticle?.shortDesc || !this.newArticle?.photo ) {
      this.errorMessages.push('Veuillez entrer tous les détails d article');
      return;
    }

    const selectedDate = new Date(this.newArticle.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      this.errorMessages.push('Veuillez choisir une date ultérieure à aujourd\'hui');
      return;
    }


    const article = {
      title: this.newArticle.title,
      description: this.newArticle.description,
      shortDesc: this.newArticle.shortDesc,
      photo: this.newArticle.photo,
    };

    this.articleService.addArticle(article).subscribe(
      (response) => {
        console.log(response);
        // Clear the form after adding article successfully
        this.newArticle = {
          title: '',
      description: '',
      shortDesc: '',
      photo: '',
        };

       
      },
      (error) => {
        console.error(error);
        this.errorMessages.push('Failed to add article');
      }
    );
  }

}

