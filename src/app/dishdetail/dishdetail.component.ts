import { Component, OnInit,Input, ViewChild,Inject} from '@angular/core';
import {dish} from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Comment} from '../shared/comment';
import { flyInOut,visibility,expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class DishdetailComponent implements OnInit {

  contactForm: FormGroup;
  comment: Comment;
  contactType = ContactType;
  @ViewChild('fform') contactFormDirective;
  dish: dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishcopy: dish;
  dishErrMess: string;
  visibility = 'shown';
  formErrors = {
    'author': '',
    'comment':''
    
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
    },
    
  };
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }
    
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
        disherrmess => this.dishErrMess = <any>disherrmess);
        this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.dishErrMess = <any>errmess);
    }
  
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length],
      disherrmess => this.dishErrMess = <any>disherrmess;
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length],
      disherrmess => this.dishErrMess = <any>disherrmess;
    }

  goBack(): void {
    this.location.back();
  }
  createForm() : void {
    this.contactForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['',[Validators.required, Validators.minLength(2)]],
      rating: ''
    });
    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged(data),
      disherrmess => this.dishErrMess = <any>disherrmess);

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.contactForm) { return; }
    const form = this.contactForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.comment = this.contactForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.dishErrMess = <any>errmess; });
    console.log(this.comment);
    this.contactForm.reset({
      author: '',
      comment: '',
      rating:5
    });
    
    this.contactFormDirective.resetForm();
  }
}