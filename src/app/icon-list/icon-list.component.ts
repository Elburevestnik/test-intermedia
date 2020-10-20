import {Component, OnInit} from '@angular/core';
import {BASIC_ICONS} from '../../assets/basic_icons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

export interface IIconInfo {
  iconName: string;
  value: SafeHtml;
}

export interface IIconInfoList {
  [prop: string]: IIconInfo[];
}

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {
  iconList = BASIC_ICONS;
  iconListGroupBySize: IIconInfoList = {};
  savedIconList: IIconInfoList;
  iconSizeGroup: string[] = [];
  currentIconColor = 'default';
  colorsArray = [
    'default',
    'blue',
    'green',
    'red',
    'orange'
  ];

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.getIconGroupBySize();
    this.getSizeGroup();
    this.savedIconList = {...this.iconListGroupBySize};
  }

  getIconGroupBySize() {
    const parser = new DOMParser();
    Object.entries(this.iconList).forEach(([iconName, valueStr]) => {
      const svgElement = parser.parseFromString(valueStr, 'image/svg+xml').documentElement;
      const value = {
        iconName,
        value: this.sanitizer.bypassSecurityTrustHtml(valueStr)
      };
      const keyName = svgElement.getAttribute('width')
        ? parseInt(svgElement.getAttribute('width'), 10)
        : 'unknown';
      this.iconListGroupBySize[keyName] = this.iconListGroupBySize[keyName] ? [...this.iconListGroupBySize[keyName], value] : [value];
    });
  }

  getSizeGroup() {
    this.iconSizeGroup = Object.keys(this.iconListGroupBySize).map((key) => {
      this.sortIconList(key);
      return key;
    });
  }

  sortIconList(size) {
    this.iconListGroupBySize[size].sort((a: IIconInfo, b: IIconInfo) => {
      return a.iconName === b.iconName
        ? 0
        : a.iconName > b.iconName
          ? 1
          : -1;
    });
  }

  searchIcon(value: string) {
    Object.keys(this.iconListGroupBySize).forEach(key => {
      this.iconListGroupBySize[key] = this.savedIconList[key].filter(iconInfo => iconInfo.iconName.includes(value));
    });
  }

  changeIconColor(color: string) {
    this.currentIconColor = color;
  }
}
