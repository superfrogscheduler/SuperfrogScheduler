from .models import *
import locale, time, io
from collections import defaultdict


def get_appearance_dict(appearances):
    appearance_dict = defaultdict(list)
    for a in appearances:
        sf_appearance = SuperfrogAppearance.objects.get(pk = a)
        appearance_dict[sf_appearance.superfrog].append(sf_appearance.appearance)
    return appearance_dict
    

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
    mile = appearance.mileage * 2
    amount = deltaHour* 25 + float(mile) * .5
    appearance.status = 'Completed'
    appearance.save()
    locale.setlocale( locale.LC_ALL, 'en_US.utf8' )
    return ('Appearance Name: '+appearance.name + ', ' + 'Appearance Date: '+datesS + ', ' + 'Appearance Time: '+ aT + '-' + bT +  ', ' +  "Pay: " + locale.currency( amount, grouping=True ), amount)

