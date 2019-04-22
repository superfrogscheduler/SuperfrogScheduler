from .models import *
import pdfrw, locale, time
from collections import defaultdict
INVOICE_TEMPLATE_PATH = 'Honorarium_Request_Final.pdf'
#INVOICE_OUTPUT_PATH = 'fillform.pdf'

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY='/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_kEY='/Widget'

def get_appearance_dict(appearances):
    appearance_dict = defaultdict(list)
    for a in appearances:
        sf_appearance = SuperfrogAppearance.objects.get(pk = a)
        appearance_dict[sf_appearance.superfrog].append(sf_appearance.appearance)
    return appearance_dict
    



def fill_fields(template_pdf, data_dict):
    
    annotations=template_pdf.pages[0][ANNOT_KEY]
    for annotation in annotations:
        if annotation[SUBTYPE_KEY]==WIDGET_SUBTYPE_kEY:
            if(annotation[ANNOT_FIELD_KEY]):
                key=annotation[ANNOT_FIELD_KEY][1:-1]
                if key in data_dict.keys():
                    annotation.update(
                        pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                    )
                    # annotation.update(
                    #     pdfrw.PdfDict(Ff=1)
                    # )
    return template_pdf


def create_pdf(superfrog):
    template_pdf=pdfrw.PdfReader(INVOICE_TEMPLATE_PATH)
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(NeedAppearances=pdfrw.PdfObject('true')))
    data_dict = {
                'name' : superfrog.user.first_name + " "+ superfrog.user.last_name,
                'address_1' : superfrog.street+ ' ' + superfrog.city+ ' ' + superfrog.state+ ' ' + superfrog.zipCode,
    }
    template_pdf = fill_fields(template_pdf, data_dict)
    return template_pdf

def process_appearance(appearance):
    a = appearance.start_time
    b = appearance.end_time
    dates = appearance.date
    datesS = dates.strftime('%Y/%m/%d')
    aT = a.strftime('%I:%M%p')
    bT = b.strftime('%I:%M%p')
    deltaA = datetime.timedelta(hours=a.hour, minutes = a.minute)
    deltaB = datetime.timedelta(hours=b.hour, minutes= b.minute)
    dA = deltaA
    dB = deltaB
    delta = dB - dA
    deltaSec = delta.total_seconds()
    deltaHour = deltaSec / 3600
    mile = appearance.mileage
    amount = deltaHour* 25 + mile * .5
    # appearance.status = 'Completed'
    # appearance.save()
    locale.setlocale( locale.LC_ALL, '' )
    return ('Appearance Name: '+appearance.name + ', ' + 'Appearance Date: '+datesS + ', ' + 'Appearance Time: '+ aT + '-' + bT +  ', ' +  "Pay: " + locale.currency( amount, grouping=True ), amount)

