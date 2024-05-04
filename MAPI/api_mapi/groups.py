from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.apps import apps




############################################################################
############################## Permissions #################################
############################################################################



# Get content type for UserBase model
UserBase = apps.get_model('api_mapi', 'UserBase')
content_type_user = ContentType.objects.get_for_model(UserBase)

# Permissions for all user types
can_view_dashboard = Permission.objects.create(
    codename='can_view_dashboard',
    name='Can view dashboard',
    content_type=content_type_user,
)

# Permissions for Admins
can_manage_users = Permission.objects.create(
    codename='can_manage_users',
    name='Can manage users',
    content_type=content_type_user,
)
can_manage_groups = Permission.objects.create(
    codename='can_manage_groups',
    name='Can manage groups',
    content_type=content_type_user,
)

# Permissions for Editors
can_add_post = Permission.objects.create(
    codename='can_add_comment',
    name='Can add comment',
    content_type=content_type_user,
)
can_edit_post = Permission.objects.create(
    codename='can_edit_comment',
    name='Can edit comment',
    content_type=content_type_user,
)
can_delete_post = Permission.objects.create(
    codename='can_delete_comment',
    name='Can delete comment',
    content_type=content_type_user,
)

############################################################################
############################## Groupes #####################################
############################################################################

admin_group = Group.objects.create(name='Admins')
fournisseur_group = Group.objects.create(name='Fournisseurs')
consommateur_group = Group.objects.create(name='Consommateurs')

# Assign permissions to groups
admin_group.permissions.add(
    can_view_dashboard,
    can_manage_users,
    can_manage_groups,
    can_add_post,
    can_edit_post,
    can_delete_post,
)

fournisseur_group.permissions.add(
    can_view_dashboard,
    can_add_post,
    can_edit_post,
    can_delete_post,
)


consommateur_group.permissions.add(
    can_view_dashboard,
)

