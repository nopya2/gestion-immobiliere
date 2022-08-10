<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220810173613 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE learner ADD identity_photo_id INT DEFAULT NULL, ADD postal_box VARCHAR(255) DEFAULT NULL, ADD email VARCHAR(255) DEFAULT NULL, ADD district VARCHAR(255) NOT NULL, ADD registration_number VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE learner ADD CONSTRAINT FK_8EF38343D751045 FOREIGN KEY (identity_photo_id) REFERENCES image (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8EF383438CEDFBE ON learner (registration_number)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8EF38343D751045 ON learner (identity_photo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE learner DROP FOREIGN KEY FK_8EF38343D751045');
        $this->addSql('DROP INDEX UNIQ_8EF383438CEDFBE ON learner');
        $this->addSql('DROP INDEX UNIQ_8EF38343D751045 ON learner');
        $this->addSql('ALTER TABLE learner DROP identity_photo_id, DROP postal_box, DROP email, DROP district, DROP registration_number');
    }
}
