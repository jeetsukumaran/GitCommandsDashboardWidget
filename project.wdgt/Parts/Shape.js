/*
Copyright © 2006-2007 Apple Inc.  All Rights Reserved.

IMPORTANT:  This Apple software ("Apple Software") is supplied to  you in consideration of your agreement to the following terms. Your use, installation and/or redistribution of this Apple Software constitutes acceptance of these terms. If you do not agree with these terms, please do not use, install, or redistribute this Apple Software.

Provided you comply with all of the following terms, Apple grants you a personal, non-exclusive license, under Apple’s copyrights in the Apple Software, to use, reproduce, and redistribute the Apple Software for the sole purpose of creating Dashboard widgets for Mac OS X. If you redistribute the Apple Software, you must retain this entire notice in all such redistributions.

You may not use the name, trademarks, service marks or logos of Apple to endorse or promote products that include the Apple Software without the prior written permission of Apple. Except as expressly stated in this notice, no other rights or licenses, express or implied, are granted by Apple herein, including but not limited to any patent rights that may be infringed by your products that incorporate the Apple Software or by other works in which the Apple Software may be incorporated.

The Apple Software is provided on an "AS IS" basis.  APPLE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, REGARDING THE APPPLE SOFTWARE OR ITS USE AND OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.

IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION, AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function CreateShape(shapeID, spec)
{
	var shapeElement = document.getElementById(shapeID);
	if (!shapeElement.loaded) {
		shapeElement.loaded = true;
		var prefix = "Images/" + shapeID + "_";
		var height = getElementHeight(shapeElement) || 20;
		var leftImageWidth = spec.leftImageWidth || 0;
		var rightImageWidth = spec.rightImageWidth || 0;
		shapeElement.object = new Shape(shapeElement, height, leftImageWidth, rightImageWidth, prefix + "left.png", prefix + "middle.png", prefix + "right.png");
		
		return shapeElement.object;
	}
}

function Shape(shape, height, leftImageWidth, rightImageWidth, imgLeft, imgMiddle, imgRight)
{
	this._init(shape, height, leftImageWidth, rightImageWidth, imgLeft, imgMiddle, imgRight);
}

Shape.prototype._init = function(shape, height, leftImageWidth, rightImageWidth, imgLeft, imgMiddle, imgRight)
{	
	this._imgLeftPath = imgLeft;
	this._imgMiddlePath = imgMiddle;
	this._imgRightPath = imgRight;

	var style = null;
	var element = null;

	var container = document.createElement("div");
	this._container = container;

	shape.appendChild(container);
	
	// Create the inner elements	
	var element = document.createElement("div");
	var style = element.style;
	style.position = "absolute";
	style.display = "inline-block";
	style.background = "url(" + this._imgLeftPath + ") no-repeat top left";
	style.height = height + "px";
	style.width = leftImageWidth + "px";
	container.appendChild(element);
	
	element = document.createElement("div");
	style = element.style;
	style.position = "absolute";
	style.display = "inline-block";
	style.backgroundRepeat = "repeat-x";
	style.backgroundImage = "url(" + this._imgMiddlePath + ")";
	style.lineHeight = height + "px";
	style.height = height + "px";
	style.left = leftImageWidth + "px";
	style.right = rightImageWidth + "px";
	style.overflow = "hidden";
	style.width = "auto";
	style.whiteSpace = "nowrap";
	container.appendChild(element);
	
	element = document.createElement("div");
	style = element.style;
	style.position = "absolute";
	style.display = "inline-block";
	style.background = "url(" + this._imgRightPath + ") no-repeat top left";
	style.height = height + "px";
	style.width = rightImageWidth + "px";
	style.right = 0 + "px";
	container.appendChild(element);

	style = container.style;
	style.left = 0;
	style.right = 0;
	style.width = "auto";
	style.height = height + "px";
}

Shape.prototype.remove = function()
{
	var parent = this._container.parentNode;
	parent.removeChild(this._container);
}

Shape.prototype._updateImages = function(height, leftImageWidth, rightImageWidth)
{
	this._container.style.height = height + "px";
	
	var leftDiv = this._container.children[0];
	leftDiv.style.background = "url(" + this._imgLeftPath + ") no-repeat top left";
	leftDiv.style.height = height + "px";
	leftDiv.style.width = leftImageWidth + "px";
	
	var middleDiv = this._container.children[1];
	middleDiv.style.backgroundImage = "url(" + this._imgMiddlePath + ")";
	middleDiv.style.height = height + "px";
	middleDiv.style.left = leftImageWidth + "px";
	middleDiv.style.right = rightImageWidth + "px";
	
	var rightDiv = this._container.children[2];
	rightDiv.style.background = "url(" + this._imgRightPath + ") no-repeat top left";
	rightDiv.style.height = height + "px";
	rightDiv.style.width = rightImageWidth + "px";
	rightDiv.style.right = 0 + "px";
}
