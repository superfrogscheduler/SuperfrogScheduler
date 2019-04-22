from django.urls import path, include
from django.conf.urls import url
from .router import router
from django.contrib.auth import views as auth_views
# from.views import AppearanceByStatusList

from .views import (
    list_by_status,
    appearances,
    detail,
    create,
    events_customer_monthly,
    getSuperfrog,
    getAdmin,
    signUp,
    list_by_status_list,
    login_view,
    logout_view,
    acceptAppearance,
    rejectAppearance,
    payroll_detail,
    payroll_appearance,
    email, 
    list_by_status_superfrog,
    generatePayroll,
    list_SuperfrogAppearance_by_Status,
    Appearance_to_Change, 
    update_appearance,
    superfrog_appearance_detail,
    show_appearances_by_superfrog,
    class_schedule,
    class_schedule_intersection,
    get_Superfrogs,
    filter_by_Superfrog_and_date,
    payroll_test,
    run_tasks,
    )

urlpatterns = [
    url(r'^appearances/$', appearances),
    url(r'^appearances/status/(?P<status>\w+)/$', list_by_status),
    url(r'^appearances/(?P<id>\d+)/$', detail),
    url(r'^events/customer-monthly/(?P<year>\d+)/(?P<month>\d+)/$', events_customer_monthly),   
    url(r'^employee/(?P<id>\d+)/$', getSuperfrog),
    url(r'^get-admin/(?P<id>\d+)/$', getAdmin),
    url(r'^employeeAppearance/(?P<id>\d+)/(?P<sId>\d+)/$', signUp),
    url(r'^listAppearances/status/(?P<status>\w+)/(?P<sID>\d+)/$', list_by_status_list),
    url(r'^adminAccept/(?P<id>\d+)/$',acceptAppearance),
    url(r'^adminReject/(?P<id>\d+)/$', rejectAppearance),
    url(r'^appearance/(?P<id>\d+)/$', payroll_detail),
    url(r'^SuperFrogappearance/status/(?P<status>\w+)/$', payroll_appearance),
    url(r'^email/', email),
    url(r'^landingAppearance/status/(?P<status>\w+)/(?P<sId>\d+)/$', list_by_status_superfrog),
    url(r'^payrollAppearances/(?P<adminID>\d+)/$', generatePayroll),
    url(r'^superfrogappearances/status/(?P<status>\w+)/$',list_SuperfrogAppearance_by_Status),
    url(r'^SuperFrogappearance/(?P<AID>\d+)/$', Appearance_to_Change),
    url(r'^updateAppearance/$', update_appearance),
    url(r'^superfrogappearancedetails/(?P<id>\d+)/$', superfrog_appearance_detail),
    url(r'^by_Superfrog/status/(?P<status>\w+)/(?P<SFID>\d+)/$', show_appearances_by_superfrog),
    url(r'^class-schedule/(?P<id>\d+)/$', class_schedule),
    url(r'^class-schedule-intersection/$', class_schedule_intersection),
    url(r'^get_Superfrogs/$', get_Superfrogs),   
    url(r'payroll-test/', payroll_test),
    url(r'^filter_by_Superfrog_Date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/$',filter_by_Superfrog_and_date),
    url(r'^auth/login/$', login_view.as_view(), name='Login'),
    url(r'^auth/logout/$', logout_view.as_view(), name='Logout'),
    url(r'^reset-password/$', auth_views.PasswordResetView.as_view(), name='password_rest'),
    url(r'^reset-password/done/$', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    url(r'^reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^reset-password/complete/$', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    
    url(r'^run-tasks/', run_tasks)

]
