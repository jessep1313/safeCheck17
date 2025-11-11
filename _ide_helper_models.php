<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\InspectForm|null $inspectForms
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Inspection> $inspections
 * @property-read int|null $inspections_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VehicleType> $vehicleTypes
 * @property-read int|null $vehicle_types_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification searchValues(?string $search = '')
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Certification whereUpdatedAt($value)
 */
	class Certification extends \Eloquent {}
}

namespace App\Models{
/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Form newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Form newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Form query()
 */
	class Form extends \Eloquent {}
}

namespace App\Models{
/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormField query()
 */
	class FormField extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $vehicle_type_id
 * @property int $certification_id
 * @property string $folio
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $preload_fields Precargar el los campos del formulario
 * @property-read \App\Models\Certification $certificate
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InspectFormField> $fields
 * @property-read int|null $fields_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Inspection> $inspections
 * @property-read int|null $inspections_count
 * @property-read \App\Models\VehicleType $vehicleType
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm searchValues(?string $search = '')
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereCertificationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereFolio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm wherePreloadFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectForm whereVehicleTypeId($value)
 */
	class InspectForm extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $inspect_form_id
 * @property string $label
 * @property string|null $description
 * @property string|null $img_src
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \App\Enum\InspectFormFieldLocation $location
 * @property-read \App\Models\InspectForm $inspectForm
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereImgSrc($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereInspectFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectFormField whereUpdatedAt($value)
 */
	class InspectFormField extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $user_id
 * @property int|null $certification_id
 * @property int|null $vehicle_type_id
 * @property int|null $driver_id
 * @property int|null $guard_id
 * @property int|null $inspect_form_id
 * @property string $uuid
 * @property int $trailer_quantity
 * @property string|null $company_transport
 * @property string|null $company_property
 * @property \App\Enums\InspectionType $type
 * @property string|null $plate_number
 * @property \App\Enums\InspectStatus $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \App\Enums\Step|null $current_step
 * @property int|null $questions_init
 * @property string|null $customer_name
 * @property string|null $driver_name
 * @property string|null $guard_name
 * @property-read \App\Models\Certification|null $certification
 * @property-read \App\Models\User|null $driver
 * @property-read \App\Models\InspectForm|null $inspectForm
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InspectionPoint> $points
 * @property-read int|null $points_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InspectionTrailer> $trailers
 * @property-read int|null $trailers_count
 * @property-read \App\Models\User|null $user
 * @property-read \App\Models\User|null $userGuard
 * @property-read \App\Models\VehicleType|null $vehicleType
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection searchValues(?string $search)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereCertificationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereCompanyProperty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereCompanyTransport($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereCurrentStep($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereDriverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereDriverName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereGuardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereInspectFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection wherePlateNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereQuestionsInit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereTrailerQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereUuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Inspection whereVehicleTypeId($value)
 */
	class Inspection extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $inspection_id
 * @property int $inspect_form_field_id
 * @property string|null $evidence
 * @property int $result
 * @property int $answered
 * @property string|null $comments
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Inspection $inspection
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereAnswered($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereComments($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereEvidence($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereInspectFormFieldId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereInspectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereResult($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionPoint whereUpdatedAt($value)
 */
	class InspectionPoint extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $inspection_id
 * @property string|null $vin
 * @property string|null $plate
 * @property string|null $seal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Inspection $inspection
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer whereInspectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer wherePlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer whereSeal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InspectionTrailer whereVin($value)
 */
	class InspectionTrailer extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $key
 * @property string $path
 * @property string $filename
 * @property string|null $original_filename
 * @property string|null $mime_type
 * @property int|null $file_size
 * @property int $destroy_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereDestroyAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereMimeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereOriginalFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StorageTemp whereUpdatedAt($value)
 */
	class StorageTemp extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Inspection> $drivenInspections
 * @property-read int|null $driven_inspections_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Inspection> $guardedInspections
 * @property-read int|null $guarded_inspections_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Inspection> $inspections
 * @property-read int|null $inspections_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User searchValues(?string $search = '')
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Certification> $certifications
 * @property-read int|null $certifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InspectForm> $inspectForm
 * @property-read int|null $inspect_form_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Inspection> $inspections
 * @property-read int|null $inspections_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType availableByCertificate($certification_id)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VehicleType whereUpdatedAt($value)
 */
	class VehicleType extends \Eloquent {}
}

