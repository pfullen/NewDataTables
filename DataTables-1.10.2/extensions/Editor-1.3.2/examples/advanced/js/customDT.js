var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
	editor = new $.fn.dataTable.Editor( {
		dom:  'T<"clear">lfrtip',
		ajax: "../php/joinArray.php",
		table: "#example",
		fields: [ {
				label: "First name:",
				name:  "users.first_name"
			}, {
				label: "Last name:",
				name:  "users.last_name"
			}, {
				label: "Site:",
				name:  "users.site",
				type:  "select"
			}, {
				"label": "Access:",
				"name": "access[].id",
				"type": "checkbox"
			}
		]
	} );

	$('#example').dataTable( {
		dom: "Tfrtip",
		ajax: {
			url: "../php/joinArray.php",
			type: 'POST'
		},
		columns: [{
				"class":          'details-control',
				"orderable":      false,
				"data":           null,
				"defaultContent": ''
			},
		
			{ data: "users.first_name" },
			{ data: "users.last_name" },
			{ data: "sites.name" },
			{ data: "access", render: "[, ].name" }
		],
		tableTools: {
		"sSwfPath": "copy_csv_xls_pdf.swf",
			sRowSelect: "os",
			aButtons: [
				{ sExtends: "editor_create", editor: editor },
				{ sExtends: "editor_edit",   editor: editor },
				{ sExtends: "editor_remove", editor: editor },
				'copy',
 			   'xls',
  			   'csv',
            'pdf',
            'print'
			]
		},
		initComplete: function ( settings, json ) {
			editor.field( 'users.site' ).update( json.sites );
			editor.field( 'access[].id' ).update( json.access );
		}
	} );
	// Add event listener for opening and closing details
	$('#example tbody').on('click', 'td.details-control', function () {
	   alert('you clicked expand');
		var tr = $(this).closest('tr');
		var row = table.row( tr );

		if ( row.child.isShown() ) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child( format(row.data()) ).show();
			tr.addClass('shown');
		}
	} );
} );