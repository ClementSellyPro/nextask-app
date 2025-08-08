import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardType } from '../../models/Card.model';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ModalAddCardComponent } from '../modal-add-card/modal-add-card.component';
import { TagsService } from '../../services/tags.service';
import { Observable } from 'rxjs';
import { TagType } from '../../models/Tag.model';

@Component({
  selector: 'app-task-card',
  imports: [FormsModule, DatePipe, ModalAddCardComponent, NgIf, AsyncPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent implements OnInit {
  @ViewChild('checkSection', { static: false })
  checkSection!: ElementRef<HTMLElement>;
  isCompleted: boolean = false;
  isUpdating: boolean = false;
  tagList$!: Observable<TagType[]>;
  tagsCard!: TagType[];

  @Input() cardData!: CardType;
  @Input() columnID!: string;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagList$ = this.tagsService.tagList$;
    this.tagsCard = this.cardData.tags;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    if (this.isUpdating) {
      this.isUpdating = false;
    }
  }

  isTagInCard(tag: TagType) {
    // return this.cardData.tags.some((t) => t.id === tag.id) ?? false;
    return true;
  }

  onMouseHover() {
    if (this.checkSection) {
      this.displayCheckbox();
    }
  }

  onMouseLeave() {
    if (this.checkSection && !this.isCompleted) {
      this.hideCheckbox();
    }
  }

  onCompleted() {
    if (!this.isCompleted) {
      this.hideCheckbox();
      this.isCompleted = false;
    } else {
      this.displayCheckbox();
      this.isCompleted = true;
    }
  }

  hideCheckbox() {
    this.checkSection.nativeElement.style.display = 'none';
    this.checkSection.nativeElement.style.width = '0%';
  }

  displayCheckbox() {
    this.checkSection.nativeElement.style.display = 'block';
    this.checkSection.nativeElement.style.width = '15%';
  }

  onOpenUpdateModal(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('checkmark')) {
      this.isUpdating = true;
    }
  }

  onCloseUpdateModal() {
    this.isUpdating = false;
  }
}
