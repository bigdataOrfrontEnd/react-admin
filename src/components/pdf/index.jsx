import React, { PureComponent } from 'react';
import styles from './index.less';
import PDFJS from 'pdfjs-dist';
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';
PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
let container;
let pageDiv;

class CataloguePDF extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
		
	}
	componentDidMount() {
    // this.props.wsUrl  父组件传过来的地址  http://127.0.0.1:8000/record-bazy/4ca66658211140518b15b9ebe39401e0.pdf
		if(this.props.wsUrl){
			this.getPDF(this.props.wsUrl)
		}
	}
	getPDF=(url)=> {
		PDFJS.getDocument(url).then((pdf) => {
			container = document.getElementById('container');
			for (var i = 1; i<= pdf.numPages; i++) {
				this.renderPDF(pdf,i);
			}
		})
	}
	renderPDF=(pdf,num)=>{
		pdf.getPage(num).then((page) => {
			var scale = 1.5;
			var viewport = page.getViewport(scale);
			pageDiv = document.createElement('div');
			pageDiv.setAttribute('id', 'page-' + (page.pageIndex + 1));
			pageDiv.setAttribute('style', 'position: relative;margin-bottom:12px');
			container.appendChild(pageDiv);
			var canvas = document.createElement('canvas');
			pageDiv.appendChild(canvas);
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			
			// page.render(renderContext);
			page.render(renderContext).then(() => {
				return page.getTextContent();
			}).then((textContent) => {
				// 创建文本图层div
				const textLayerDiv = document.createElement('div');
				textLayerDiv.setAttribute('class', 'textLayer');
				// 将文本图层div添加至每页pdf的div中
				document.getElementById('page-' + (page.pageIndex + 1)).appendChild(textLayerDiv);
				
				// 创建新的TextLayerBuilder实例
				var textLayer = new TextLayerBuilder({
					textLayerDiv: textLayerDiv,
					pageIndex: page.pageIndex,
					viewport: viewport
				});
				
				textLayer.setTextContent(textContent);
				
				textLayer.render();
			});
		});
	}
	render() {

		return (
			<div className={styles.pdfHeight}>
				<div id="container"></div>
			</div>
		);
	}
}

export default CataloguePDF;
      