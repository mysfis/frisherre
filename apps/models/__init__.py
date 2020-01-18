from django.db import models
from django.utils import timezone
from django.contrib import admin
class SoftDeletionQuerySet(models.QuerySet):
    def delete(self):
        return super(SoftDeletionQuerySet, self).update(deleted_at=timezone.now())

    def hard_delete(self):
        return super(SoftDeletionQuerySet, self).delete()

    def alive(self):
        return self.filter(deleted_at=None)

    def dead(self):
        return self.exclude(deleted_at=None)

class SoftDeletionManager(models.Manager):
    def __init__(self, *args, **kwargs):
        self.alive_only = kwargs.pop('alive_only', True)
        super(SoftDeletionManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        if self.alive_only:
            return SoftDeletionQuerySet(self.model).filter(deleted_at=None)
        return SoftDeletionQuerySet(self.model)
    
    def get_all_queryset(self):
        return SoftDeletionQuerySet(self.model)

    def hard_delete(self):
        return self.get_queryset().hard_delete()


class SoftDeletionModel(models.Model):
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = SoftDeletionManager()
    all_objects = SoftDeletionManager(alive_only=False)

    class Meta:
        abstract = True

    def delete(self):
        self.deleted_at = timezone.now()
        self.save()

    def hard_delete(self):
        super(SoftDeletionModel, self).delete()

def full_delete(modeladmin, request, queryset):
    queryset.hard_delete()    

class SoftDeleteAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'deleted_at',)
    list_filter = ('deleted_at',)
    actions = [full_delete, ]  # <-- Add the list action function here

    def get_queryset(self, request):
        """ Returns a QuerySet of all model instances that can be edited by the
        admin site. This is used by changelist_view. """
        # Default: qs = self.model._default_manager.get_query_set()
        # qs = self.model._default_manager.all_with_deleted()
        qs = self.model._default_manager.get_all_queryset()
        # TODO: this should be handled by some parameter to the ChangeList.
        # ordering = self.ordering or () # otherwise we might try to *None, which is bad ;)
        # if ordering:
        #     qs = qs.order_by(*ordering)
        return qs
