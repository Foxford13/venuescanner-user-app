angular
.module('venueScannerApp')
.directive('ngConfirmClick', ngConfirmClick);

function ngConfirmClick(){
	return {
		priority: -1,
		restrict: 'A',
		link: function (scope, element, attr) {
			console.log(attr);
			var msg = attr.ngConfirmClick || "Are you sure?";
			element.bind('click',function (event) {

				if (!confirm(msg)) {
		console.log(event);
					event.stopImmediatePropagation();
					event.preventDefault;
				}
			});
		}
	};
}
